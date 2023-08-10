import React, { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../chat.css";
import "./chat.css";
import { formatDistanceToNow } from "date-fns";
import { db, storage } from "../firebase";
import {
  doc,
  onSnapshot,
  query,
  collection,
  collectionGroup,
  orderBy,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Img from "../img/img.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { IoMdSend } from "react-icons/io";                

const Chatsui = () => {
  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [img, setImg] = useState(null);
  const [text, setText] = useState("");
  const [chatid, setchatid] = useState(" ");

  const [username, setUsername] = useState("");

  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chatrooms"));
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(user);

  const messagebox = (data) => {
    setchatid(data);
    const documentRef = doc(db, "chatrooms", data);

    const nestedCollectionRef1 = collection(documentRef, "messages");

    const unsubscribe1 = onSnapshot(
      query(nestedCollectionRef1, orderBy("createdOn")),
      (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setMessagesData(newData);
      },
      (error) => {
        console.error("Error fetching Nested Collection 1:", error);
      }
    );

    return () => {
      unsubscribe1();
    };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setText("");
    setImg("")

    if (img) {
      const random = Math.floor(Math.random() * 100) + 1;

      const storageRef = ref(storage, `chat_images/${random}`);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const additemRef = collection(db, "chatrooms", chatid, "messages");

            await addDoc(additemRef, {
              createdOn: serverTimestamp(),
              isText: false,
              Messsageid: "123456",
              seen: false,
              senderid: "8448158042",
              text: downloadURL,
            });
          });
        }
      );
    } else {
      const additemRef = collection(db, "chatrooms", chatid, "messages");

      await addDoc(additemRef, {
        createdOn: serverTimestamp(),
        isText: true,
        Messsageid: "123456",
        seen: false,
        senderid: "8448158042",
        text,
      });
    }
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "chatrooms"),
      where("userName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <React.Fragment>
     <Header />
            <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Chats</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/dashboard"}>Dashboard</Link>{" "}
              </li>
              <li className="breadcrumb-item active">Chats</li>
            </ol>
          </nav>
        </div>
        {/* code for chats design */}

        <div id="container">
          <div id="aside" className="col-md-4">
            <input
              type="text"
              placeholder="Find a user"
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <ul>
              {messages.map((data) => {
                return (
                  <li
                    className="d-flex gap-2 m-2"
                    onClick={() => messagebox(data.chatRoomid)}
                    style={{ cursor: "pointer" }}
                  >
                    {data.userImage === null ? (
                      <>
                        <img
                          src={`http://3.111.36.104/+ ${data.userImage}`}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <>
                          <h1>{data.userName.charAt(0)}</h1>
                        </>
                      </>
                    )}

                    <div>
                      <h2>{data.userName}</h2>
                      <h3>{data.lastMessage}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <main id="main1" className="col-md-8">
            
              {chatid == " " ? (
                <>
                  <div
                    className="justify-content-center align-items-center"
                    style={{ marginTop: "150px" }}
                  >
                    <center>
                      <p style={{ alignItems: "center", fontSize: "30px" }}>
                        please select the user to continue
                      </p>
                      <img src={require("../img/chat.png")} width={"40%"} />
                    </center>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "10px" }}>
                    {messagesData.map((i) => {
                      return (
                        <>
                          <div
                            className={`message ${
                              i.senderid !== "8448158042" ? "false" : "owner"
                            }`}
                          >
                            <div className="messageContent">
                              <div>
                                {i.isText == true ? (
                                  <p className="d-flex  flex-column">
                                    <span>{i.text}</span>
                                    <span
                                      style={{
                                        fontSize: "10px",
                                        textAlign: "right",
                                      }}
                                    >
                                      {i.createdOn ? (
                                        <>
                                          {i.createdOn
                                            .toDate()
                                            .toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              second: "2-digit",
                                            })}
                                        </>
                                      ) : (
                                        <>Loding </>
                                      )}
                                    </span>
                                  </p>
                                ) : (
                                  <>
                                    <img src={i.text} width={"100%"} />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <form className="chat-bar-input-block" method="post">
                   
                      <input
                        required
                        id="textInput"
                        className="input-box"
                        value={text}
                        onChange={(e) => setText(() => e.target.value)}
                        type="text"
                        name="msg"
                        placeholder="Type Your message"
                      />
                    

                   
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                      <label htmlFor="file" style={{ padding: "5px" }}>
                        <img src={Img} alt="" />
                      </label>
                      <div>
                      <button type="submit" onClick={handleSend} className="primary">
                        <IoMdSend  /> 
                      </button>
                      </div>
                      
                    
                  </form>
                </>
              )}
            
          </main>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Chatsui;
