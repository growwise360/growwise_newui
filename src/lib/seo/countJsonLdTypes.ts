/**
 * Count @type occurrences in JSON-LD payloads (including nodes inside @graph).
 */
export function countSchemaType(payload: unknown, schemaType: string): number {
  if (!payload || typeof payload !== 'object') return 0
  if (Array.isArray(payload)) {
    return payload.reduce((sum, item) => sum + countSchemaType(item, schemaType), 0)
  }
  const record = payload as Record<string, unknown>
  let count = record['@type'] === schemaType ? 1 : 0
  if (record['@graph']) count += countSchemaType(record['@graph'], schemaType)
  return count
}

/** Sum schema type counts across multiple parsed JSON-LD script payloads. */
export function countSchemaTypeInScripts(scripts: readonly unknown[], schemaType: string): number {
  return scripts.reduce((sum, script) => sum + countSchemaType(script, schemaType), 0)
}
