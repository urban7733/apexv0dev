export interface SourceTrackingResult {
  originalSource: string | null
  firstPublished: Date | null
  publicationHistory: Array<{
    platform: string
    url: string
    publishDate: Date
    context: string
  }>
  reverseImageResults: Array<{
    url: string
    similarity: number
    context: string
  }>
}

class ContentSourceTracker {
  async findOriginalSource(file: File): Promise<SourceTrackingResult> {
    // Simulate web scraping and reverse image search
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const fileName = file.name.toLowerCase()

    // Simulate finding sources for certain file patterns
    const hasKnownSource =
      fileName.includes("news") ||
      fileName.includes("stock") ||
      fileName.includes("getty") ||
      fileName.includes("reuters")

    if (hasKnownSource) {
      const platforms = ["Getty Images", "Reuters", "AP News", "BBC News", "CNN"]
      const selectedPlatform = platforms[Math.floor(Math.random() * platforms.length)]

      return {
        originalSource: `https://${selectedPlatform.toLowerCase().replace(" ", "")}.com/image/${Math.random().toString(36).substr(2, 9)}`,
        firstPublished: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
        publicationHistory: [
          {
            platform: selectedPlatform,
            url: `https://${selectedPlatform.toLowerCase().replace(" ", "")}.com/original`,
            publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            context: "Original publication",
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/user/status/123456789",
            publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            context: "Viral repost",
          },
          {
            platform: "Reddit",
            url: "https://reddit.com/r/pics/comments/abc123",
            publishDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            context: "Discussion thread",
          },
        ],
        reverseImageResults: [
          {
            url: `https://${selectedPlatform.toLowerCase().replace(" ", "")}.com/image/original`,
            similarity: 0.98,
            context: "Exact match found",
          },
          {
            url: "https://tineye.com/search/similar",
            similarity: 0.87,
            context: "Similar composition",
          },
        ],
      }
    }

    // No source found
    return {
      originalSource: null,
      firstPublished: null,
      publicationHistory: [],
      reverseImageResults: [],
    }
  }
}

export const contentSourceTracker = new ContentSourceTracker()
