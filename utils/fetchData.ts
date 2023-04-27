export interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
}

export interface PageInfo {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
}

export interface Page {
  media: Media[];
  pageInfo: PageInfo;
}

export interface PageData {
  Page: Page;
}

interface Variables {
  page: number;
  perPage: number;
}

export async function fetchData(variables: Variables): Promise<Page> {
  const query = `
      query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }          
            media {
                id
                title {
                romaji
                english
                native
                }
                bannerImage
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
            }
        }
      }
    `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data } = await response.json();
  console.log(data)

  return data.Page;
}
