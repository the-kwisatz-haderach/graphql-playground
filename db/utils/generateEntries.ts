export const generateEntries = (count: number, entryCreator: () => any) => {
  const entries: any[] = []
  for (let i = 0; i < count; i++) {
    entries.push(entryCreator())
  }
  return entries
}
