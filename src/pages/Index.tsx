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
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import { Octokit } from "octokit";

interface Iusers {
  id: number;
  login: string;
}

interface Irepos {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
}

function SearchUser() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [users, setUsers] = useState<Iusers[] | []>([]);
  const [repos, setRepos] = useState<Irepos[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userLoading, setUserLoading] = useState(false);
  const [repoLoading, setRepoLoading] = useState(false);
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  const getUsers = async () => {
    setUserLoading(true);
    setUsers([]);

    try {
      let result = await octokit.request("GET /search/users", {
        q: searchTerm,
        per_page: 5,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      setUsers(result.data.items);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setUserLoading(false);
    }
  };

  const getRepos = async (user: string) => {
    setRepoLoading(true);
    setRepos([]);

    try {
      let result = await octokit.request("GET /search/repositories", {
        q: `user:${user}`,
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      setRepos(result.data.items);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setRepoLoading(false);
    }
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const submitForm = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    getUsers();
  };

  const expandedHandler =
    (panel: string, user: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        getRepos(user);
      }

      setExpanded(isExpanded ? panel : false);
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
                  required
                  placeholder="Enter username"
                  value={searchTerm}
                  onChange={searchHandler}
                  autoComplete="off"
                  sx={{backgroundColor: "#f5f5f5"}}
                />
              </FormControl>
              <Button type="submit" variant="contained" fullWidth>
                Search
              </Button>
              {searchTerm && (
                <Typography>Showing users for "{searchTerm}"</Typography>
              )}
              {userLoading && (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {users?.map((user) => (
                <Accordion
                  elevation={0}
                  disableGutters
                  key={user.id}
                  expanded={expanded === `panel${user.id}`}
                  onChange={expandedHandler(`panel${user.id}`, user.login)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <Typography>{user.login}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingTop: 2, paddingRight: 0 }}>
                    {repoLoading && (
                      <Box display="flex" justifyContent="center">
                        <CircularProgress />
                      </Box>
                    )}
                    {repos?.map((repo) => (
                      <Card
                        variant="outlined"
                        sx={{ marginLeft: 2, marginBottom: 2, backgroundColor: "#e5e5e5" }}
                        key={repo.id}
                      >
                        <CardContent>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" fontWeight={700}>
                              {repo.name}
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <Typography
                                sx={{ paddingRight: 1, fontWeight: 700 }}
                              >
                                {repo.stargazers_count}
                              </Typography>
                              <StarIcon />
                            </Box>
                          </Box>
                          <Typography>{repo.description}</Typography>
                        </CardContent>
                      </Card>
                    ))}
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
