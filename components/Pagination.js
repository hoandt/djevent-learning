import Link from "next/link";
function Pagination({ totalPages, current_page }) {
  return (
    <>
      {current_page > 1 && (
        <Link href={`/events/?page=${+current_page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {current_page < totalPages && (
        <Link href={`/events/?page=${+current_page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}

export default Pagination;
