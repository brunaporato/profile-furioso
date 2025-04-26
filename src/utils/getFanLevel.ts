const fanLevelMap: Record<string, string> = {
  'Todo jogo': 'Furioso Raiz',
  'Alguns jogos': 'Engajado',
  'Só finais importantes': 'Furiosinho',
  'Raramente': 'Casual',
}

export function getFanLevel(frequency: string) {
  return fanLevelMap[frequency] || 'Casual'
}