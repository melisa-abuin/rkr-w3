/**
 * Triggers a download of a given Blob object as a file with the specified filename.
 *
 * This function creates a temporary anchor (`<a>`) element, sets its `href` attribute
 * to a URL representing the Blob object, and programmatically clicks it to start
 * the download. Afterward, it cleans up by removing the anchor element and revoking
 * the created object URL.
 *
 * @param blob - The Blob object containing the file data to download.
 * @param filename - The desired name for the downloaded file, including extension.
 */
export const downloadBlobFile = (blob: Blob, filename: string) => {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(a.href)
}
