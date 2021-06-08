import React, { useState } from 'react'

import CellList from '../components/CellsList';
import styles from '../styles/home.module.scss'

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [searchByName, setSearchByName] = useState("");

  const handleChange = async function () {
    setIsOn(!isOn);
  }
  return (
    <React.Fragment>
      <nav className={styles.main_nav}>
        <input
          className={styles.searchBar}
          type="text"
          value={searchByName}
          placeholder="Filter By Company Name..."
          onChange={event => setSearchByName(event.target.value)}
        />
        <label className={styles.container}> Only Jobs Posted Recently
          <input type="checkbox" onChange={e => handleChange()} />
          <span className={styles.checkmark} />
        </label>


      </nav>
      <CellList
        onlyNew={isOn}
        searchByName={searchByName}
      />
    </React.Fragment>

  )
}
