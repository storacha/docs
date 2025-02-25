---
title: Storacha Powering AI
---

# Welcome to Storacha's AI Solution: the hard drive for your robot brain!

Use Storacha to store your LLM, RAG knowledge fragments, agent state, outputs and all the rest in a decentralized network of storage nodes. 

We recommend taking a look at [Quickstart Guide](https://docs.storacha.network/quickstart/) as you dive in. To make your experience even easier, we are working on integrations with ElizaOS and Lit Protocol. 

## ElizaOS

A database adapter for ElizaOS that enables decentralized storage of agent data using the Storacha network.

**Example**

How a developer can use the Storacha database adapter with ElizaOS:

```javascript
import { Agent } from '@elizaos/core';
import { DatabaseAdapter } from '@storacha/elizaos-adapter';

const myAgentId = 'my-agent';

// 1. Set up long-term storage
const storageAdapter = new DatabaseAdapter({ 
  agentId: myAgentId,
  delegation: 'your-delegation-token', 
  agentPrivateKey: 'your-agent-private-key', 
  gateway: 'https://w3s.link' 
});

// 2. Create an agent
const agent = new Agent({ 
  id: myAgentId,
  name: 'Assistant', 
  databaseAdapter: storageAdapter, 
  // Configure agent behavior
  config: { 
    personality: 'helpful and friendly', 
    capabilities: ['chat', 'task-management', 'learning'] 
  }
});

// 3. Use the agent
await agent.init();

// Handle user messages
agent.on('message', async (message) => {
  const response = await agent.process(message);
  console.log(response);
});

// Create goals
await agent.createGoal({
  title: 'Help user with coding',
  priority: 'high'
});

// Access memory
const memories = await agent.getMemories({
  count: 10,
  tableName: 'conversations'
});
```

## Lit Protocol

Coming Soon 👀
