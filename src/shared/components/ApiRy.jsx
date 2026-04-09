import { useEffect, useState } from "react"
import axios from "axios"

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Stack
} from "@mui/material"
import Grid from "@mui/material/GridLegacy"

export const Api = () => {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState({})
  const [query, setQuery] = useState('')

  useEffect(() => {
    const source = axios.CancelToken.source()

    axios.get("https://rickandmortyapi.com/api/character", {
      params: { page, name: query },
      cancelToken: source.token
    })
      .then(({ data }) => {
        setCharacters(data.results || [])
        setInfo(data.info || {})
      })
      .catch((err) => {
        if (axios.isCancel(err)) return

        if (err.response?.status === 404) {
          setCharacters([])
          setInfo({})
          return
        }

        console.error(err)
      })

    return () => source.cancel()
  }, [page, query])

  return (
    <Box sx={{ p: 4 }}>

      {/*  TITULO */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Personajes Rick & Morty
      </Typography>

      {/*  BUSCADOR */}
      <TextField
        fullWidth
        placeholder="Buscar personaje..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setPage(1)
        }}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px"
          },
          mt: "100px"
        }}
      />

      {/*  GRID DE PERSONAJES */}
      <Grid container spacing={3}>
        {characters.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: 'center', color: '#546180', mt: 4 }}>
              No se encontraron personajes.
            </Typography>
          </Grid>
        ) : (
          characters.map((char) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={char.id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
                  },
                }}
              >
                {/*  IMAGEN */}
                <CardMedia component="img" height="250" image={char.image} alt={char.name} />

                {/*  INFO */}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {char.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Estado: {char.status}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Especie: {char.species}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Género: {char.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!info.prev}
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!info.next}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </Button>
      </Stack>
    </Box>
  )
}