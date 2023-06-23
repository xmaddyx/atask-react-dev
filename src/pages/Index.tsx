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
import { Octokit } from "octokit";

interface UserDetails {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: any;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

function SearchUser() {
  const [users, setUsers] = React.useState<UserDetails[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  const getUsers = async () => {
    setUsers([]);

    try {
      let result = await octokit.request("GET /search/users", {
        q: searchTerm,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      setUsers(result.data.items);
      console.log(result.data.items);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const submitForm = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    getUsers();
  };

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
              {users?.map((item) => (
              <Accordion elevation={0} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#CCCCCC" }}
                >
                  <Typography>{item.login}</Typography>
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
              ))}
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default SearchUser;
