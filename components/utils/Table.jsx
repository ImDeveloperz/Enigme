import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Dropdown,
} from "@nextui-org/react";
import { StyledBadge } from "./icons/StyledBadge";
import { IconButton } from "./icons/IconButton";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { useEffect, useMemo, useState } from "react";
import axiosClient from "@/axios-client";
import Layout from "../Layout";
import SimpleLoad from "../loading/SimpleLoad";
import Link from "next/link";
import { Popover, Button, Grid } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "@/utils/AuthContext";

export default function App() {
  const [statue, setStatue] = useState("");
  const [selected, setSelected] = useState(new Set([statue]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const Statue = () => {
    if (user.statue == 0) {
      setStatue("activer");
    } else {
      setStatue("desactiver");
    }
  };
  
  const { user } = useStateContext();
  console.log(user);
  const [users, setUsers] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const getUser = async () => {
    setLoading(true);
    const id = user.id_User;

    console.log("id : ", id);
    if (id) {
      axiosClient
        .post("/user/users", id)
        .then(({ data }) => {
          setUsers(data.user);
          console.log(user);

          if (user) Statue();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const DeleteUser = ({ id, user }) => {
    return (
      <Grid.Container
        css={{
          gap: "$8",
          borderRadius: "14px",
          padding: "0.8rem",
          maxWidth: "330px",
        }}
      >
        <Row justify="center" align="center">
          <Text b>Confirm</Text>
        </Row>
        <Row>
          <Text>
            Êtes-vous sûr de vouloir supprimer{" "}
            <span className="text-blue-700">{user}</span> ? En effectuant cette
            action, vous ne pourrez pas récupérer les données.
          </Text>
        </Row>
        <Grid.Container justify="space-between" alignContent="center">
          <Grid>
            <Button
              size="sm"
              light
              onClick={() => {
                setLoading(true),
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button
              size="sm"
              shadow
              color="error"
              onClick={() => {
                  deleteUser(id);
              }}
            >
              Supprimer
            </Button>
          </Grid>
        </Grid.Container>
      </Grid.Container>
    );
  };
  const UpdateUser = ({ id, user }) => {
    return (
      <Grid.Container
        css={{
          gap: "$8",
          borderRadius: "14px",
          padding: "0.8rem",
          maxWidth: "330px",
        }}
      >
        <Row justify="center" align="center">
          <Text b>Modifier le Statue du {user}</Text>
        </Row>
        <Row>
          <div className="w-full flex justify-center items-center">
            <Dropdown>
              <Dropdown.Button flat>
                <div className="text-md flex items-center justify-center w-[100px] ">
                  {selectedValue}
                </div>
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="primary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                <Dropdown.Item key="activer">Active</Dropdown.Item>
                <Dropdown.Item key="desactiver">Desactiver</Dropdown.Item>
                {/* <Dropdown.Item key="edit"></Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Row>
        <Grid.Container justify="space-between" alignContent="center">
          <Grid>
            <Button
              size="sm"
              light
              onClick={() => {
                setLoading(true),
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button
              size="sm"
              shadow
              color="primary"
              onClick={() => {
                edit(id);
              }}
            >
              Modifier
            </Button>
          </Grid>
        </Grid.Container>
      </Grid.Container>
    );
  };
  function edit(id) {
    console.log("id  : ", id);
    let stat;
    setStatue(selectedValue);
    if (selectedValue == "activer") stat = 0;
    else stat = 1;
    axiosClient.post("/user/statue", { id, stat }).then(({ data }) => {
      getUser();
    });
  }
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
  ];
  function deleteUser(id) {
    console.log("id  : ", id);
    axiosClient
      .post("/user/delete", id)
      .then(({ data }) => {
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      toast("User Supprimer avec succée!!!");
    }, 1000);
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="h-[80%]  items-center justify-center flex ">
        <SimpleLoad />
      </div>
    );
  }
  return (
    <div className="pb-8 px-12 pt-10">
      <Table
        sticked
        striped
        aria-label="Example static collection striped table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>ROLE</Table.Column>
          <Table.Column>STATUS</Table.Column>
          <Table.Column>ACTION</Table.Column>
        </Table.Header>
        <Table.Body>
          {users?.map((item) => {
            return (
              <Table.Row key={item?.id_User}>
                <Table.Cell>{item?.name + " " + item?.prenom} </Table.Cell>
                <Table.Cell>
                  {item.role == 0 ? "utilisateur" : "administrateur"}
                </Table.Cell>
                <Table.Cell>
                  <StyledBadge type={item.statue == 0 ? "active" : "paused"}>
                    {item.statue == 0 ? (
                      <p className="p-2 px-4">Active</p>
                    ) : (
                      <p className="p-2">Desactiver</p>
                    )}
                  </StyledBadge>
                </Table.Cell>
                <Table.Cell>
                  <Row justify="center" align="center">
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Details">                     
                          <Popover>
                            <Popover.Trigger>
                              <IconButton>
                                <EyeIcon size={20} fill="#979797" />
                              </IconButton>
                            </Popover.Trigger>
                            <Popover.Content>
                              <div className="py-4 px-6 flex flex-col gap-2">
                                  <div className='flex gap-4'>
                                      <p >{item?.name + ' ' +item?.prenom}</p>
                                  </div>
                                  <div className="font-light pt-4">
                                    Email : 
                                  </div>
                                  <div>
                                    <p>{item?.email}</p>
                                  </div>
                              </div>
                            </Popover.Content>
                          </Popover>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Edit user">
                        <Popover>
                          <Popover.Trigger>
                            <IconButton>
                              <EditIcon size={20} fill="#979797" />
                            </IconButton>
                          </Popover.Trigger>
                          <Popover.Content>
                            <UpdateUser id={item.id_User} user={item?.name} />
                          </Popover.Content>
                        </Popover>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip content="Delete user" color="error">
                        <Popover>
                          <Popover.Trigger>
                            <IconButton>
                              <DeleteIcon size={20} fill="#FF0080" />
                            </IconButton>
                          </Popover.Trigger>
                          <Popover.Content>
                            <DeleteUser id={item?.id_User} user={item?.name}/>
                          </Popover.Content>
                        </Popover>
                      </Tooltip>
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
