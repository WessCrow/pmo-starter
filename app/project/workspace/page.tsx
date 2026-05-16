import { redirect } from "next/navigation";

/**
 * Workspace em standby (não usado nesta fase).
 * Mantém a rota para não quebrar links; redireciona para o fluxo ativo.
 */
export default function WorkspacePage() {
  redirect("/project/new");
}
