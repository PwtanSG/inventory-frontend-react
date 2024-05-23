import React, { useEffect } from 'react'
import axios from 'axios'
import { getSessionToken } from '../Services/userSession';

// axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_BACKEND_API_KEY;
// axios.defaults.headers['Authorization'] = 'eyJraWQiOiJXK0w2MFZNeVdYNlRBMzVNTGNCYkVwdEJGVFFTTHVyQlB2d3ZsbGhEUUdBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NGI4NzQ3OC01MGExLTcwYzYtNjg1NC0xNzBkMTliMmUxMjMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfcjBGZDZlWjVyIiwiY29nbml0bzp1c2VybmFtZSI6ImFkbWluIiwib3JpZ2luX2p0aSI6IjAwMTk2ZjgyLTk5ZTItNGExZC1iNzAyLTBiNGE4OTNkNTJlYiIsImF1ZCI6IjJpdnV2ZWhoNGdoMm81OGJnODl1aHZxaGlzIiwiZXZlbnRfaWQiOiI2MDUxY2FlZS1iMWEzLTRlNjctOTI3OC1hZmM0YjhlNTUxOWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxMzk3OTE1NiwiZXhwIjoxNzEzOTgyNzU2LCJpYXQiOjE3MTM5NzkxNTYsImp0aSI6IjY3M2U1YmI4LWU3ZjUtNDExNy1hODM0LWYwOTFkNjllMWZkYyIsImVtYWlsIjoicHd0YW4ubWlzY0BnbWFpbC5jb20ifQ.kgPzQOB05pU7OYr54OkMsdRFac_y2zZOn_JtM7TiFtf3KaxxkWvVQAUTeZ3CppIN-Nq1kZylJdSkZZwAw0matK4krmKXwFbIeA_IhyvY3n6sRmGgxG745g8UBwjbDk43g8W-ZhUBE81Zi3LqWaqJck4mBTUKUZ4G6CqIce7koZfCZW5fERzpMQxkF_4hpTMUv6TI9jEYKS2O1T2VCBzm17yWrAHItZkhWo2woQUJmazJNocZymgE_88NJhxKUuMEDbOBxQkpCp1fIQN3tKdLT4O6VvlE3tYMtQ946l_KmZhIoJYqgpl2DwDmil6U8mh7_HK5ND-9tfIVVC3adOhXWg';

//axios.defaults.headers['Authorization'] = token;

const About = () => {
  const token = getSessionToken();
  console.log(token)
  axios.defaults.headers['Authorization'] = token;
  // const API_URL = 'https://7dia3zl3cd.execute-api.us-east-1.amazonaws.com/prod/health'
  // const API_URL = 'https://rirlckz043.execute-api.us-east-1.amazonaws.com/prod/health'
  const API_URL = process.env.REACT_APP_BACKEND_BASE_DOMAIN
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios({
          method: 'get',
          url: `${API_URL}health`,
        })
        console.log(response)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchData();
  }, [])

  return (
    <div>About</div>
  )
}

export default About
