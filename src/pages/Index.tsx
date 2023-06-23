import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Box,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Card,
  CardContent,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";

function SearchUser() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const submitForm = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    alert(searchTerm)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box alignContent="center" mt={4}>
          <form onSubmit={submitForm}>
            <Stack direction="column" spacing={2}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="user"
                  size="small"
                  placeholder="Enter username"
                  value={searchTerm}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>
              <Button type="submit" variant="contained" fullWidth>
                Search
              </Button>
              {searchTerm && (
                <Typography>Showing users for "{searchTerm}"</Typography>
              )}
              <Accordion elevation={0} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#CCCCCC" }}
                >
                  <Typography>Exampleuser 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card variant="outlined" sx={{ marginLeft: 2 }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={700}>
                          Repository title
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography sx={{ paddingRight: 1, fontWeight: 700 }}>
                            12
                          </Typography>
                          <StarIcon />
                        </Box>
                      </Box>
                      <Typography>Repository description</Typography>
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default SearchUser;
