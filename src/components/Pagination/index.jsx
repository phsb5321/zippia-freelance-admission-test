import styles from './styles.module.scss'

export default function Pagination({ jobsPerPage, totalJobs, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <ul className={styles.mainWrapper}>
            {
                pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}
