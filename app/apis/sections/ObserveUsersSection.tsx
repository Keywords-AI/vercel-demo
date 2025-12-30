"use client";

import { useState } from "react";
import { JsonBlock } from "../../components/JsonBlock";
import { postProxy } from "../lib/postProxy";

export function ObserveUsersSection(props: { keywordsaiApiKey: string }) {
  const { keywordsaiApiKey } = props;

  // Fixed demo identifiers (no user input required)
  const demoCustomerIdentifier = "customer_user_demo123";
  const env = "prod";

  const [usersStepLoading, setUsersStepLoading] = useState<
    "create-user" | "list" | "get" | "update" | null
  >(null);
  const [createUserResult, setCreateUserResult] = useState<any>(null);
  const [usersListResult, setUsersListResult] = useState<any>(null);
  const [usersGetResult, setUsersGetResult] = useState<any>(null);
  const [usersUpdateResult, setUsersUpdateResult] = useState<any>(null);

  const users = {
    createUser: async () => {
      // Creating a log with customer_params will create/update the user profile.
      setUsersStepLoading("create-user");
      setCreateUserResult(null);
      try {
        const data = await postProxy("/api/keywordsai/logs/create", keywordsaiApiKey, {
          customer_identifier: demoCustomerIdentifier,
        });
        setCreateUserResult(data);
      } finally {
        setUsersStepLoading(null);
      }
    },
    list: async () => {
      setUsersStepLoading("list");
      setUsersListResult(null);
      try {
        const data = await postProxy("/api/keywordsai/users/list-get", keywordsaiApiKey, {
          page: 1,
          page_size: 50,
          sort_by: "-first_seen",
          environment: env,
        });
        setUsersListResult(data);
      } finally {
        setUsersStepLoading(null);
      }
    },
    get: async () => {
      setUsersStepLoading("get");
      setUsersGetResult(null);
      try {
        const data = await postProxy("/api/keywordsai/users/get", keywordsaiApiKey, {
          customer_identifier: demoCustomerIdentifier,
          environment: env,
        });
        setUsersGetResult(data);
      } finally {
        setUsersStepLoading(null);
      }
    },
    update: async () => {
      setUsersStepLoading("update");
      setUsersUpdateResult(null);
      try {
        const data = await postProxy("/api/keywordsai/users/update", keywordsaiApiKey, {
          customer_identifier: demoCustomerIdentifier,
          environment: env,
          period_budget: 200.0,
          metadata: { plan: "pro", updated_by: "keywords-ai-demo" },
        });
        setUsersUpdateResult(data);
      } finally {
        setUsersStepLoading(null);
      }
    },
  };

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-sm font-bold">Observe → Users</h2>
        <p className="text-xs text-gray-600 mt-1">
          No inputs. This flow uses a fixed <span className="font-mono">customer_identifier</span>:{" "}
          <span className="font-mono font-bold">{demoCustomerIdentifier}</span>
        </p>
      </div>

      <div className="mb-4 border border-gray-200 bg-gray-50 p-4">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">Fixed inputs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">customer_identifier:</span> {demoCustomerIdentifier}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">environment:</span> {env}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">list params:</span> {JSON.stringify({ page: 1, page_size: 50, sort_by: "-first_seen" })}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">update payload:</span> {JSON.stringify({ period_budget: 200.0, metadata: { plan: "pro", updated_by: "keywords-ai-demo" } })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={users.createUser}
          disabled={usersStepLoading !== null}
        >
          1) Create user (via Create log)
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={users.list}
          disabled={usersStepLoading !== null}
        >
          2) List users
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={users.get}
          disabled={usersStepLoading !== null}
        >
          3) Retrieve user
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={users.update}
          disabled={usersStepLoading !== null}
        >
          4) Update user
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <JsonBlock
          title="Step 1 response (Create log → creates user)"
          value={createUserResult}
          emptyText="Click “1) Create user (via Create log)”"
        />
        <JsonBlock title="Step 2 response (List users)" value={usersListResult} emptyText="Click “2) List users”" />
        <JsonBlock title="Step 3 response (Retrieve user)" value={usersGetResult} emptyText="Click “3) Retrieve user”" />
        <JsonBlock title="Step 4 response (Update user)" value={usersUpdateResult} emptyText="Click “4) Update user”" />
      </div>
    </div>
  );
}


