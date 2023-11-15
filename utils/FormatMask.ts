export function FormatMask(mask: string): string {
  return mask.replace(/[.\-/()\s]/g, "");
}
