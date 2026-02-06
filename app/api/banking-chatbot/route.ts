export const maxDuration = 30;

// ============================================================================
// TOOL DEFINITIONS - 5 Banking Tools (Mock implementations)
// ============================================================================

type ToolParams = Record<string, unknown>;

const BANKING_TOOLS: Record<string, (params: ToolParams) => Promise<unknown>> = {
  checkAccountBalance: async (params: ToolParams) => {
    await simulateDelay(100);
    const accountId = (params.accountId as string) || "default";
    const accountType = (params.accountType as string) || "all";
    const mockBalances = {
      checking: { balance: 15420.5, available: 15420.5, pending: 0 },
      savings: { balance: 52300.0, available: 52300.0, pending: 0 },
    };
    if (accountType === "all") {
      return {
        accountId,
        balances: mockBalances,
        totalBalance: mockBalances.checking.balance + mockBalances.savings.balance,
        asOf: new Date().toISOString(),
      };
    }
    return {
      accountId,
      accountType,
      ...(mockBalances[accountType as keyof typeof mockBalances] || mockBalances.checking),
      asOf: new Date().toISOString(),
    };
  },

  getTransactionHistory: async (params: ToolParams) => {
    await simulateDelay(150);
    const accountId = (params.accountId as string) || "default";
    const limit = (params.limit as number) || 5;
    const transactionType = params.transactionType as string;
    const mockTransactions = [
      { id: "TXN001", date: "2026-02-05", description: "Payroll Deposit", amount: 5200.0, type: "credit" },
      { id: "TXN002", date: "2026-02-04", description: "AWS Services", amount: -342.15, type: "debit" },
      { id: "TXN003", date: "2026-02-03", description: "Office Supplies Co", amount: -89.99, type: "debit" },
      { id: "TXN004", date: "2026-02-02", description: "Client Payment - Acme", amount: 12500.0, type: "credit" },
      { id: "TXN005", date: "2026-02-01", description: "Utility Payment", amount: -215.0, type: "debit" },
    ];
    let filtered = mockTransactions;
    if (transactionType && transactionType !== "all") {
      filtered = mockTransactions.filter((t) => t.type === transactionType);
    }
    return {
      accountId,
      transactions: filtered.slice(0, limit),
      totalCount: filtered.length,
      period: "Last 30 days",
    };
  },

  wireTransferStatus: async (params: ToolParams) => {
    await simulateDelay(120);
    const referenceNumber = params.referenceNumber as string;
    const lookupType = (params.lookupType as string) || "recent";
    if (lookupType === "pending") {
      return {
        pendingWires: [
          { ref: "WR-2026-0042", amount: 25000.0, recipient: "Vendor Corp", status: "Processing", eta: "2026-02-06" },
        ],
        totalPending: 1,
      };
    }
    if (lookupType === "byReference" && referenceNumber) {
      return {
        referenceNumber,
        amount: 15000.0,
        recipient: "Acme Supplies",
        status: "Completed",
        completedAt: "2026-02-04T14:32:00Z",
        fee: 25.0,
      };
    }
    return {
      recentWires: [
        { ref: "WR-2026-0041", amount: 15000.0, status: "Completed", date: "2026-02-04" },
        { ref: "WR-2026-0040", amount: 8500.0, status: "Completed", date: "2026-02-01" },
      ],
      totalCount: 2,
    };
  },

  createSupportTicket: async (params: ToolParams) => {
    await simulateDelay(80);
    const category = (params.category as string) || "other";
    const priority = (params.priority as string) || "medium";
    const subject = (params.subject as string) || "Support request";
    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
    return {
      ticketId,
      category,
      priority,
      subject,
      status: "Open",
      createdAt: new Date().toISOString(),
      estimatedResponse: priority === "urgent" ? "1 hour" : priority === "high" ? "4 hours" : "24 hours",
      message: `Your support ticket ${ticketId} has been created. A team member will respond within the estimated time.`,
    };
  },

  getAccountInfo: async (params: ToolParams) => {
    await simulateDelay(90);
    const infoType = (params.infoType as string) || "basic";
    const basic = {
      accountName: "Rho Business Account",
      accountNumber: "****4521",
      routingNumber: "****0892",
      accountType: "Business Checking",
      status: "Active",
    };
    if (infoType === "basic") return basic;
    if (infoType === "settings") {
      return {
        ...basic,
        notifications: { email: true, sms: true, push: true },
        twoFactorEnabled: true,
        dailyTransferLimit: 100000,
        monthlyWireLimit: 500000,
      };
    }
    return {
      ...basic,
      openedDate: "2024-03-15",
      primaryContact: "finance@company.com",
      authorizedUsers: 3,
      linkedAccounts: 2,
      lastActivity: new Date().toISOString(),
    };
  },
};

function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// KEYWORDS AI GATEWAY HELPER
// ============================================================================

async function callKeywordsAIGateway(
  apiKey: string,
  params: {
    model?: string;
    messages?: Array<{ role: string; content: string }>;
    prompt_id?: string;
    prompt_variables?: Record<string, string>;
  },
  metadata: Record<string, string>
): Promise<string> {
  const baseUrl = process.env.KEYWORDSAI_BASE_URL || "https://api.keywordsai.co";

  // When using prompt_id, wrap in a `prompt` object with `variables` (not top-level prompt_id).
  // This matches the Keywords AI Prompt Management API format.
  const body = params.prompt_id
    ? {
        prompt: {
          prompt_id: params.prompt_id,
          variables: params.prompt_variables,
        },
      }
    : {
        model: params.model || "gpt-4o-mini",
        messages: params.messages,
      };

  const response = await fetch(`${baseUrl}/api/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-Data-Keywordsai-Params": Buffer.from(JSON.stringify(metadata)).toString("base64"),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Keywords AI Gateway error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

// ============================================================================
// PROMPT TEMPLATE (used when no prompt_id is provided)
// ============================================================================

const TOOL_SELECTION_SYSTEM_PROMPT = `You are a banking assistant tool router. Your job is to analyze user messages and determine which banking tool to use.

Available tools:
1. checkAccountBalance - Check account balance. Use for: balance inquiries, "how much money", "funds available"
2. getTransactionHistory - Get recent transactions. Use for: "recent transactions", "spending", "payment history"
3. wireTransferStatus - Check wire transfer status. Use for: "wire status", "transfer status", "pending transfers"
4. createSupportTicket - Create support ticket. Use for: problems, complaints, issues needing human help
5. getAccountInfo - Get account details. Use for: "account info", "account settings", "profile"

Respond with a JSON object:
{
  "tool": "toolName or 'none' if no tool needed",
  "parameters": { ... tool-specific parameters ... },
  "reasoning": "Brief explanation of why this tool was selected"
}

Parameter schemas:
- checkAccountBalance: { accountId: "default", accountType: "checking"|"savings"|"all" }
- getTransactionHistory: { accountId: "default", limit: 5-50, transactionType?: "all"|"debit"|"credit" }
- wireTransferStatus: { referenceNumber?: "string", lookupType: "recent"|"byReference"|"pending" }
- createSupportTicket: { category: "account"|"transaction"|"wire"|"technical"|"other", priority: "low"|"medium"|"high"|"urgent", subject: "string", description: "string" }
- getAccountInfo: { infoType: "basic"|"detailed"|"settings" }`;

// ============================================================================
// API ROUTE HANDLER
// ============================================================================

export async function POST(req: Request) {
  const { message, promptId } = await req.json();
  const steps: Array<{ agent: string; action: string; output: string; toolName?: string }> = [];

  // Get Keywords AI API key (from header or environment)
  const keywordsApiKey =
    req.headers.get("x-keywordsai-api-key")?.trim() || process.env.KEYWORDSAI_API_KEY;

  if (!keywordsApiKey) {
    return Response.json(
      { error: "Keywords AI API key is required. Set KEYWORDSAI_API_KEY or pass via header." },
      { status: 400 }
    );
  }

  // Set runtime key for OTEL exporter
  (globalThis as any).__KEYWORDSAI_RUNTIME_API_KEY__ = keywordsApiKey;

  // Metadata for tracing
  const traceMetadata = {
    customer_identifier: "banking_demo_user",
    trace_group_identifier: "banking_chatbot_workflow",
    thread_identifier: `banking_thread_${Date.now()}`,
  };

  try {
    // ========================================================================
    // STEP 1: Tool Selection via Keywords AI Gateway
    // ========================================================================

    let toolSelectionText: string;

    if (promptId) {
      // Use Keywords AI Prompt Management
      toolSelectionText = await callKeywordsAIGateway(
        keywordsApiKey,
        {
          prompt_id: promptId,
          prompt_variables: { user_message: message },
        },
        { ...traceMetadata, step: "1_tool_selection", agent: "Tool Selection Agent" }
      );
    } else {
      // Use inline prompt via Gateway
      toolSelectionText = await callKeywordsAIGateway(
        keywordsApiKey,
        {
          messages: [
            { role: "system", content: TOOL_SELECTION_SYSTEM_PROMPT },
            { role: "user", content: `User message: "${message}"\n\nAnalyze this message and determine which banking tool(s) to use. Return a JSON response.` },
          ],
        },
        { ...traceMetadata, step: "1_tool_selection", agent: "Tool Selection Agent" }
      );
    }

    // Parse tool selection
    let toolSelection: { tool: string; parameters: Record<string, unknown>; reasoning: string };
    try {
      const jsonMatch = toolSelectionText.match(/\{[\s\S]*\}/);
      toolSelection = jsonMatch
        ? JSON.parse(jsonMatch[0])
        : { tool: "none", parameters: {}, reasoning: "Could not parse response" };
    } catch {
      toolSelection = { tool: "none", parameters: {}, reasoning: toolSelectionText };
    }

    steps.push({
      agent: "Tool Selection Agent",
      action: "Analyzing user intent and selecting appropriate tool...",
      output: JSON.stringify(toolSelection, null, 2),
    });

    // ========================================================================
    // STEP 2: Execute the selected tool (direct execution, no LLM needed)
    // ========================================================================

    let toolResult: unknown = null;
    const selectedToolName = toolSelection.tool;
    const isValidTool = selectedToolName && selectedToolName !== "none" && selectedToolName in BANKING_TOOLS;

    if (isValidTool) {
      // Execute the tool directly with the parameters from the LLM
      const toolFn = BANKING_TOOLS[selectedToolName];
      toolResult = await toolFn(toolSelection.parameters || {});

      steps.push({
        agent: "Tool Executor",
        action: `Executing ${selectedToolName}...`,
        output: JSON.stringify(toolResult, null, 2),
        toolName: selectedToolName,
      });
    } else {
      steps.push({
        agent: "Tool Executor",
        action: "No tool selected - using general response",
        output: "No specific banking tool was needed for this query.",
      });
    }

    // ========================================================================
    // STEP 3: Generate final response via Keywords AI Gateway
    // ========================================================================

    const finalResponseText = await callKeywordsAIGateway(
      keywordsApiKey,
      {
        messages: [
          {
            role: "system",
            content: `You are a helpful internal banking assistant for Rho. You help staff with internal questions about processes, terminology, and next steps. Keep answers professional and concise. You have just executed a banking tool and received data. Summarize the results in a clear, helpful way.`,
          },
          {
            role: "user",
            content: `User question: "${message}"

Tool used: ${selectedToolName || "none"}
Tool result: ${JSON.stringify(toolResult, null, 2)}

Provide a helpful, professional response to the user based on this data.`,
          },
        ],
      },
      { ...traceMetadata, step: "3_response_generation", agent: "Response Generator" }
    );

    steps.push({
      agent: "Response Generator",
      action: "Generating final response...",
      output: finalResponseText,
    });

    return Response.json({
      response: finalResponseText,
      steps,
      toolUsed: isValidTool ? selectedToolName : "none",
      toolResult,
      metadata: {
        workflow: "banking-chatbot",
        promptId: promptId || null,
        traceGroup: "banking_chatbot_workflow",
      },
    });
  } catch (error) {
    console.error("Banking chatbot error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        steps,
      },
      { status: 500 }
    );
  }
}
