import React, { useEffect, useState, useRef, useCallback } from "react";
import { Media, fetchAnimeList } from "@/utils/fetchData";
import Head from "next/head";
import Image from "next/image";
import Loading from "@/components/Loading";
import GenreChips from "@/components/GenreChip";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [animeList, setAnimeList] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagePagination, setPagePagination] = useState({
    page: 1,
    total: 0,
    currentPage: 0,
    lastPage: 0,
    hasNextPage: false,
    perPage: 10,
  });

  const fetchDataAndUpdateState = useCallback(
    async (page: number, perPage: number) => {
      setIsLoading(true);
      const variables = {
        page,
        perPage,
      };
      const pageData = await fetchAnimeList(variables);
      const newAnimeList = pageData
        ? pageData.media.map((media) => ({
            id: media.id,
            title: {
              romaji: media.title.romaji,
              english: media.title.english,
              native: media.title.native,
            },
            bannerImage: media.bannerImage,
            coverImage: {
              extraLarge: media.coverImage.extraLarge,
              large: media.coverImage.large,
              medium: media.coverImage.medium,
              color: media.coverImage.color,
            },
            genres: media.genres,
            status: media.status,
            season: media.season
          }))
        : [];

      if (pageData && pageData.pageInfo) {
        setPagePagination((prevState) => ({
          ...prevState,
          currentPage: pageData.pageInfo.currentPage,
        }));
      }

      setAnimeList((prevList) => [...prevList, ...newAnimeList]);
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchDataAndUpdateState(pagePagination.page, pagePagination.perPage);
    console.log(pagePagination);
  }, [fetchDataAndUpdateState, pagePagination.page, pagePagination.perPage]);

  const observerOptions: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  function handleObserver(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    const lastAnime = entries[entries.length - 1];
    if (!lastAnime.isIntersecting) return;
    fetchDataAndUpdateState(
      pagePagination.currentPage + 1,
      pagePagination.perPage
    );
  }

  function useIntersectionObserver(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    options: IntersectionObserverInit,
    callback: IntersectionObserverCallback
  ) {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      observerRef.current = new IntersectionObserver(callback, options);

      if (ref.current) {
        observerRef.current.observe(ref.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [ref, options, callback]);

    return observerRef;
  }

  const animeListRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver(animeListRef, observerOptions, handleObserver);

  function handleClickedList(id: number) {
    router.push(`/anime-detail/${id}`)
  }

  return (
    <>
      <Head>
        <title>Anilist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <div className="w-full px-4">
            <h1 aria-labelledby="anime-list" className="text-2xl font-semibold">
              Anime List
            </h1>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="py-8 cursor-pointer">
                <div className="grid grid-cols-3 gap-5 ">
                  {animeList.map((item, index) => (
                    <div
                      key={index}
                      className=" flex gap-x-3 border border-slate-300 rounded shadow "
                      ref={animeListRef}
                      onClick={() => handleClickedList(item.id)}
                    >
                      {item.bannerImage !== null ? (
                        <Image
                          src={item.coverImage.extraLarge}
                          width={250}
                          height={250}
                          alt={item.title.romaji}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-1/3 h-full bg-gray-300 rounded dark:bg-gray-700">
                          <svg
                            className="w-12 h-12 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                          </svg>
                        </div>
                      )}
                      <div className="px-2 flex flex-col gap-y-5">
                        <h2 className=" text-2xl font-semibold">
                          {item.title.romaji}
                        </h2>
                        <p className="font-semibold">
                          Status: {item.status}
                        </p>
                        <p className="font-semibold">
                          Season: {item.season}
                        </p>
                        <div className="flex gap-x-2">
                          <p className="font-semibold">Genre: </p>
                          <GenreChips genres={item.genres} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
