export type DemoMode = "farmer" | "field" | "policy";

export type DemoResponse = {
  title: string;
  items: Array<{ label: string; value: string; color: string }>;
  recommendation: string;
};

export async function runDemo(mode: DemoMode): Promise<DemoResponse> {
  const response = await fetch(`/api/v1/demo/${mode}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Demo analysis is temporarily unavailable");
  const body = (await response.json()) as { response: DemoResponse };
  return body.response;
}
