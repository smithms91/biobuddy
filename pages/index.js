import Head from 'next/head'
import styles from '@/styles/Home.module.css'

//MUI Stuff
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EastIcon from '@mui/icons-material/East';
//DB
import PocketBase from 'pocketbase';

import { useState } from 'react';

export default function Home({ finalData }) {

  const [biosCreated, setBiosCreated] = useState(finalData.likes);
  const [value, setValue] = useState('funny');
  const [AIResponse, setAIResponse] = useState('')


  const handleBioAPI = async () => {

    let response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: 1
    })
    let newResponse = await response.json()
    setBiosCreated(newResponse.likes)
  }


  return (
    <>
      <Head>
        <title>Bio Buddy | Generate your next Twitter bio in seconds</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <button className={styles.github_button}><GitHubIcon width={30} height={30} /><span>Star on GitHub</span></button>
        <h1>Generate your next Twitter bio in seconds</h1>
        <p>{biosCreated} bios created so far.</p>
        <div className={styles.content_box}>
          <div className={styles.info_container}>
            <span>1</span>
            <h5>Copy your current bio (or write a few sentences about yourself).</h5>
          </div>
          <TextField InputLabelProps={{ style: { color: "rgba(0,0,0,.5)" } }} fullWidth className={styles.textbox} id="outlined-basic" label="Tell us about yourself" variant="outlined" multiline rows={4} />
          <div className={styles.info_container}>
            <span>2</span>
            <h5>Select your vibe.</h5>
          </div>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Vibe</InputLabel>
            <Select style={{ 'color': 'rgba(0,0,0,.5)' }} className={styles.dropdown}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={value}
              label="Vibe"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem style={{ 'color': 'rgba(0,0,0,.5)' }} value={'funny'}>Funny</MenuItem>
              <MenuItem style={{ 'color': 'rgba(0,0,0,.5)' }} value={'professional'}>Professional</MenuItem>
              <MenuItem style={{ 'color': 'rgba(0,0,0,.5)' }} value={'general'}>General</MenuItem>
            </Select>
          </FormControl>
          {/* <button className={styles.button}>Generate your bio.</button> */}
        </div>
        <button className={styles.response_button} onClick={(e) => handleBioAPI()}>Generate your bio. <EastIcon /></button>
        <div className={styles.response_box}>
          {AIResponse &&
            <>
              <p style={{ 'marginTop': '1rem' }}>asdsIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </>
          }
        </div>
        <div className={styles.footer_box}>
          <h5>Powered by <strong>OpenAI</strong> and <strong>Vercel Edge Functions</strong></h5>
          <ul style={{ 'margin': '.5rem 0 .7rem 0' }}>
            <li style={{ 'marginRight': '1rem' }}><TwitterIcon /></li>
            <li><GitHubIcon /></li>
          </ul>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps(context) {

  const pb = new PocketBase('http://127.0.0.1:8090');
  const data = {
    "likes": 123,
  };

  const authData = await pb.admins.authWithPassword(process.env.DB_USERNAME, process.env.DB_PASSWORD);
  const likes = await pb.collection('likes').getOne(process.env.DB_TABLE_ID);

  let finalData = JSON.parse(JSON.stringify(likes));

  return {
    props: { finalData }, // will be passed to the page component as props
  }
}