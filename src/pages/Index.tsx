import React, { useRef, useState } from 'react';
import { CssBaseline, Container, Box, Button, Stack, Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardContent, FormControl, OutlinedInput } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import StarIcon from "@mui/icons-material/Star"

interface UserDetails {
  title: string;
  description: string;
}

function SearchUser() {
  const [users, setUsers] = useState<UserDetails[]>([])
  const timeout = useRef<any>()
  const inputRef = useRef<any>()

  const getUsers = () => {
    clearTimeout(timeout.current)

    if (!inputRef?.current?.value?.trim()) {
      setUsers([])
      return
    }

    timeout.current = setTimeout(async () => {
      setUsers([])

      // try {
      //   setUsers([])
      // } catch (error) {
      //   setUsers([])
      // }
    }, 500)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getUsers()
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box alignContent="center" mt={4}>
          <Stack direction="column" spacing={2}>
            <FormControl fullWidth>
              <OutlinedInput 
                size="small" 
                placeholder="Enter username"
                onChange={handleChange}
                inputRef={inputRef}
                autoComplete="off"
              />
            </FormControl>
            <Button variant="contained" fullWidth>Search</Button>
            <Typography>Showing users for "Exampleuser"</Typography>
            <Accordion elevation={0} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#CCCCCC"}}>
                <Typography>Exampleuser 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card variant="outlined" sx={{ marginLeft: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6" fontWeight={700}>Repository title</Typography>
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{ paddingRight: 1, fontWeight: 700}}>12</Typography>
                        <StarIcon />
                      </Box>
                    </Box>
                    <Typography>Repository description</Typography>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default SearchUser;
