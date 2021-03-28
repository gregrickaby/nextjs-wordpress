// Set WordPress connection defaults.
export const wpUrl = process.env.WORDPRESS_URL
export const wpUser = process.env.WORDPRESS_APPLICATION_USERNAME
export const wpPass = process.env.WORDPRESS_APPLICATION_PASSWORD

// Encode WordPress application username and password.
export const wpAuth = Buffer.from(`${wpUser}:${wpPass}`).toString('base64')

// Create connection.
export default async function handler(req, res) {
  // Destructure the query.
  const {query} = req.query

  console.log('START')
  console.log(query)
  console.log(JSON.stringify(query))
  console.log('FETCH')
  try {
    // Attempt to fetch.
    const response = await fetch(
      `${wpUrl}/graphql?` +
        new URLSearchParams({
          query: query
        }),
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: wpAuth ? `Basic ${wpAuth}` : ''
        }
      }
    )

    console.log('RESPONSE')
    console.log(response)

    // Convert response to JavaScript object.
    const data = await response.json()

    console.log('DATA')
    console.log(data)

    // Send the response to the user.
    res.status(200).json(data)
  } catch (error) {
    // Issue? Leave a message and bail.
    res.status(500).json({message: `${error}`})
  }
}
