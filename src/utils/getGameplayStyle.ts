const favoriteStyleMap: Record<string, string> = {
  'KSCERATO': 'Defensivo e Técnico',
  'yuurih': 'Consistente e Equilibrado',
  'arT': 'Agressivo / Atacante',
  'chelo': 'Energético e Flexível',
  'fallen': 'Líder Estratégico e Experiente',
}

export function getGameplayStyle(player: string): string {
  return favoriteStyleMap[player] || 'Estilo Único'
}
