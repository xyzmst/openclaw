import type { OpenClawConfig } from "../config/config.js";
import { resolveAgentConfig } from "./agent-scope.js";

export type ToolFsPolicy = {
  workspaceOnly: boolean;
  allowedPaths?: string[];
};

export function createToolFsPolicy(params: {
  workspaceOnly?: boolean;
  allowedPaths?: string[];
}): ToolFsPolicy {
  return {
    workspaceOnly: params.workspaceOnly === true,
    allowedPaths: params.allowedPaths,
  };
}

export function resolveToolFsConfig(params: { cfg?: OpenClawConfig; agentId?: string }): {
  workspaceOnly?: boolean;
  allowedPaths?: string[];
} {
  const cfg = params.cfg;
  const globalFs = cfg?.tools?.fs;
  const agentFs =
    cfg && params.agentId ? resolveAgentConfig(cfg, params.agentId)?.tools?.fs : undefined;
  return {
    workspaceOnly: agentFs?.workspaceOnly ?? globalFs?.workspaceOnly,
    allowedPaths: agentFs?.allowedPaths ?? globalFs?.allowedPaths,
  };
}

export function resolveEffectiveToolFsWorkspaceOnly(params: {
  cfg?: OpenClawConfig;
  agentId?: string;
}): boolean {
  return resolveToolFsConfig(params).workspaceOnly === true;
}
