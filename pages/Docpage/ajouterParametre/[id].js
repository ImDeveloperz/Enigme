import axiosClient from "@/axios-client";
import Layout from "@/components/Layout";
import SimpleLoad from "@/components/loading/SimpleLoad";
import { DeleteIcon } from "@/components/utils/icons/DeleteIcon";
import { EditIcon } from "@/components/utils/icons/EditIcon";
import { IconButton } from "@/components/utils/icons/IconButton";
import {
  Col,
  Dropdown,
  Grid,
  Input,
  Popover,
  Row,
  Table,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

function Page() {
  const nomref = useRef();
  const typeRef = useRef();
  const [isCrypted, setIsCrypted] = useState();
  const [selected, setSelected] = useState(new Set(["Type du paramétre"]));
  // const []
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [loading, setLoading] = useState(false);
  const [parametreType, setParametreType] = useState();
  const [parametres, setParametres] = useState();
  const router = useRouter();
  const [nomCompte, setNomCompte] = useState();
  const { id } = router.query;
  function edit(idi) {
    console.log("id  : ", id);
    let stat;
    setLoading(true);
    const data = {
      stat: typeRef.current.value,
      id: idi,
      nom: nomref.current.value,
      type: selectedValue,
    };
    axiosClient.post("/ajouter/updateParametre", { data }).then(({ data }) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }
  function ajouter() {
    let stat;
    setLoading(true);
    const data = {
      typeCompte_id : id,
      stat: typeRef.current.value,
      nom: nomref.current.value,
      type: selectedValue,
    };
    axiosClient.post("/ajouter/ajouterParametre", { data }).then(({ data }) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }
  const AjouterParametre = ()=>{
    return (
      <div className=" gap-4 flex flex-col py-4 px-10 w-[400px] ">
        <div className="">
          <Input width="100%" label="Nom Paramètres" type="text" ref={nomref} />
        </div>
        <div className="w-full flex items-center justify-center">
          {/* <p> */}
          {/* Nom Paramètres
                </p> */}
          <Dropdown>
            <Dropdown.Button flat>
              <div className="text-md flex items-center justify-center w-[200px] ">
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
              {parametreType?.map((parametre) => (
                <Dropdown.Item key={parametre.typeParametre_name}>
                  {parametre.typeParametre_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="text-sm font-normal text-center">Crypter</p>
          <div className="w-full flex justify-between md:w-[50%] text-md font-base">
            <div className="flex ">
              <input type="radio" value={1} name="sexe" ref={typeRef} />{" "}
              <span className="p-2 font-meduim ">Oui</span>
            </div>
            <div className="flex">
              <input type="radio" value={0} name="sexe" ref={typeRef} />{" "}
              <span className="p-2 font-meduim">Non</span>
            </div>
          </div>
        </div>
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
                ajouter();
              }}
            >
              Ajouter
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    );
  }
  const UpdateParametre = (id) => {
    return (
      <div className=" gap-4 flex flex-col py-4 px-10 w-[400px] ">
        <div className="">
          <Input width="100%" label="Nom Paramètres" type="text" ref={nomref} />
        </div>
        <div className="w-full flex items-center justify-center">
          {/* <p> */}
          {/* Nom Paramètres
                </p> */}
          <Dropdown>
            <Dropdown.Button flat>
              <div className="text-md flex items-center justify-center w-[200px] ">
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
              {parametreType?.map((parametre) => (
                <Dropdown.Item key={parametre.typeParametre_name}>
                  {parametre.typeParametre_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="text-sm font-normal text-center">Crypter</p>
          <div className="w-full flex justify-between md:w-[50%] text-md font-base">
            <div className="flex ">
              <input type="radio" value={1} name="sexe" ref={typeRef} />{" "}
              <span className="p-2 font-meduim ">Oui</span>
            </div>
            <div className="flex">
              <input type="radio" value={0} name="sexe" ref={typeRef} />{" "}
              <span className="p-2 font-meduim">Non</span>
            </div>
          </div>
        </div>
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
                console.log("param_id : ", id);
                edit(id);
              }}
            >
              Modifier
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    );
  };
  useEffect(() => {
    const getParametre = async () => {
      // setLoading(true);
      if (id) {
        console.log("id : ", id);
        axiosClient
          .post("/ajouter/getParametres", id)
          .then(({ data }) => {
            console.log(data.parametres);
            //  const {nom} = data.nom
            setParametres(data.parametres);
            console.log(data.parametres.nom);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const getTypes = () => {
      axiosClient
        .post("/ajouter/getTypesParametre")
        .then(({ data }) => {
          //  const {nom} = data.nom
          setParametreType(data.typesParametre);
          console.log("types", data.typesParametre);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getCompte = async () => {
      if (id) {
        console.log("id : ", id);
        axiosClient.post("/ajouter/selectTypeCompte", id).then((d) => {
          console.log(d.data.Typecompte);
          setNomCompte(d.data.Typecompte);
        });
      }
    };
    getTypes();
    getCompte();
    getParametre();
  }, [id, loading]);
  if (loading) {
    return (
      <Layout>
        <div className="h-[80%]  items-center justify-center flex ">
          <SimpleLoad />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="h-[80%] w-full items-center justify-center">
        <div className=" mx-40 mt-20 rounded-md">
          <div className="flex justify-center items-center">
            <p className="font-bold text-xl">Paramètres {nomCompte}</p>
          </div>
          <div className="pb-8 px-12 pt-10">
            <Table
              sticked
              striped
              aria-label="Example static collection striped table"
              css={{
                minWidth: "100%",
                minHeight: "100%",
              }}
            >
              <Table.Header>
                <Table.Column>Nom de parametre</Table.Column>
                <Table.Column>Type de parametre</Table.Column>
                <Table.Column>ACTION</Table.Column>
              </Table.Header>
              <Table.Body>
                {parametres?.map((item) => {
                  return (
                    <Table.Row key={item?.id_User}>
                      <Table.Cell>{item?.nomParametre}</Table.Cell>
                      <Table.Cell>{item?.typeParametre} </Table.Cell>
                      {/* <Table.Cell></Table.Cell> */}
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}></Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Modifier Paramétre">
                              <Popover>
                                <Popover.Trigger>
                                  <IconButton>
                                    <EditIcon size={20} fill="#979797" />
                                  </IconButton>
                                </Popover.Trigger>
                                <Popover.Content>
                                  <UpdateParametre id={item?.nomParametre} />
                                </Popover.Content>
                              </Popover>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Supprimer Paramétre"
                              color="error"
                            >
                              <Popover>
                                <Popover.Trigger>
                                  <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                  </IconButton>
                                </Popover.Trigger>
                                <Popover.Content>
                                  {/* <DeleteParametre /> */}
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
            </Table>
            <div className="flex justify-end items-end mt-4">
            <Popover>
              <Popover.Trigger>
                <Button>Ajouter Parametre</Button>
              </Popover.Trigger>
              <Popover.Content>
                  <AjouterParametre/>
              </Popover.Content>
            </Popover>
            </div>
          </div>
        </div>
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
    </Layout>
  );
}

export default Page;
