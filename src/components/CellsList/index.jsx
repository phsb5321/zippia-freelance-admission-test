import React, { useEffect, useState } from 'react'

import Cell from "../Cell/index"
import Pagination from "../Pagination/index"
import axios from 'axios'
import styles from './styles.module.scss'

const payload = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: []
}

const uri = "https://www.zippia.com/api/jobs/"

export default function CellList({ searchByName, onlyNew }) {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const res = await axios.post(uri, payload);
            setJobs(res.data.jobs);
            setLoading(false);
        };

        fetchJobs();
    }, []);

    // filter Jobs
    const filteredJobs = function () {
        const filteredJobs = jobs.filter(job => {

            const name = job.companyName.toLowerCase();
            const search = searchByName.toLowerCase();
            const jobDate = new Date(job.OBJpostingDate);
            const today = new Date();

            const Difference_In_Time = today.getTime() - jobDate.getTime();

            // To calculate the no. of days between two dates
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            if (name.includes(search)) {
                if (onlyNew && Difference_In_Days <= 7) {
                    return job;
                } else if (!onlyNew) {
                    return job;
                }
            } else { return null }
        })
        return filteredJobs;
    }

    // Get current posts
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs().slice(indexOfFirstJob, indexOfLastJob);


    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (


        <React.Fragment>
            <div className={styles.mainWrapper}>
                {
                    !loading
                        ? currentJobs.map(e => <Cell key={e.jobId} job={e} />)
                        : <h1 className={styles.loading}> Loading ... </h1>
                }
            </div>

            {
                !loading
                    ? <Pagination
                        jobsPerPage={jobsPerPage}
                        totalJobs={filteredJobs().length}
                        paginate={paginate}
                    /> : <h1 />
            }


        </React.Fragment>

    )
}