
import { useRouter } from 'next/router'

import styles from './Test.module.css'

function myFetch() {

    const bodyRequest = JSON.stringify({
        user : "3000"
    });

    fetch(`/api/faq/get_question`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: bodyRequest,
  })
    .then((response) => response.json())
    .then(async (answer) => {
      console.log("okkkk")
      console.log(" answer = " , answer);
    })
    .catch((error) => {
      console.error('error :', error);
    });
}


export default function Test({name}) {

    const router = useRouter();

    return (
        <div className={styles.test}>
            <h1 onClick={() => myFetch()} >This a {name}</h1>
        </div>
    )
}