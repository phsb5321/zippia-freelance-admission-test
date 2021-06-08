import React from 'react';
import styles from './styles.module.scss'

export default function Cell({ job }) {
    const { companyLogo, companyName, jobTitle, OBJpostingDate, shortDesc } = job;
    const newDate = new Intl.DateTimeFormat("pt-BR").format(new Date(OBJpostingDate));
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={companyLogo} alt="Company Logo" />
                </div>
                <div className={styles.description}>
                    <h2>{jobTitle}</h2>
                    <h3>{companyName}</h3>
                    <p>{shortDesc}</p>
                    <p>{newDate}</p>
                </div>
            </div>
        </React.Fragment>
    )
}
