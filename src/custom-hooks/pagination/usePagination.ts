import { useState } from 'react';

export const usePagination = (data: unknown[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPerPage = Math.ceil(data.length / itemsPerPage);

  function next(): void {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPerPage));
  }

  function prev(): void {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number): void {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPerPage));
  }

  function currentData(): any[] {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }
  return { next, prev, jump, currentData, currentPage, maxPerPage}
};
