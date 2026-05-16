import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "Einstein/Atoms/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Título do Artefato</CardTitle>
        <CardDescription>Criado por IA em 10 min atrás</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-muted">
          Este é um exemplo de conteúdo dentro do card premium do Einstein.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-[10px] uppercase font-bold text-slate-400 italic">v1.0 stable</span>
      </CardFooter>
    </Card>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <Card className="w-[350px] shadow-premium border-primary/10">
      <CardHeader>
        <CardTitle className="text-primary">Draft Ativo</CardTitle>
        <CardDescription>Foco em micro-detalhes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">
          O card com sombra premium destaca artefatos urgentes ou em destaque no grid.
        </p>
      </CardContent>
    </Card>
  ),
};
