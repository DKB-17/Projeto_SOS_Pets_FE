export function formatDate(dateString?: string): string {
  if (!dateString) {
    return new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  try {
    // Handle timestamp (milliseconds)
    const timestamp = isNaN(Number(dateString)) ? dateString : Number(dateString)
    const date = new Date(timestamp)
    
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  } catch {
    return "dateString"
  }
}
