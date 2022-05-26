import { useState } from "react";
import ControlTable from "../../components/ControlTable/ControlTable";
import CreateDevices from "../../components/CreateDevices";
import { data } from "../../Models/tableData";
import MemoryBar from "../../components/MemoryBar/MemoryBar";
import { toast, ToastContainer } from "react-toastify";

const MainPage = () => {
  const [devices, setDevices] = useState([...data]);
  const [progress, setProgress] = useState(20);

  const createNewDevice = async (newDevice) => {
    const id = newDevice[0].id;
    let arr = [];
    setDevices((oldState) => [...oldState, ...newDevice]);
    await new Promise((resolve) => {
      setTimeout((resolve) => {
        setDevices((oldState) => {
          oldState.forEach((dev) => {
            let newObj = {};
            if (dev.id === id) {
              newObj = { ...dev, state: "disonnected" };
            } else {
              newObj = { ...dev };
            }
            arr.push(newObj);
          });
          return arr;
        });
      }, 3000);
    });
  };

  const updateDeviceState = (id) => {
    let arr = [];

    setDevices((oldState) => {
      oldState.forEach((dev) => {
        let newObj = {};
        if (dev.id === id) {
          newObj = {
            ...dev,
            state: dev.state === "active" ? "disconnected" : "active",
          };
        } else {
          newObj = { ...dev };
        }
        arr.push(newObj);
      });
      return arr;
    });
  };

  const changeProgress = async (id) => {
    let activeState = "";
    let activeSize = "";
    await new Promise((resolve) => {
      setTimeout((resolve) => {
        devices.forEach((elem) => {
          if (elem.id === id) {
            activeState = elem.state;
            activeSize = elem.size;
          }
        });
        setProgress((old) =>
          activeState === "active"
            ? old - parseInt(activeSize)
            : parseInt(activeSize) + old
        );
      }, 2000);
    });
  };

  const handleDelete = (id) => {
    const deletedElem = devices.find((elem) => elem.id === id);
    const time = parseInt(deletedElem.size);
    const localState = deletedElem.state;
    const newArr = devices.filter((elem) => elem.id !== id);
    setDevices(newArr);
    if (localState === "active") {
      setProgress((oldProgress) => oldProgress - time);
    }
  };

  const sendSignal = (id) => {
    const elem = devices.find((element) => element.id === id);

    if (elem.state === "active") {
      toast.success(
        "Se ha mandado una señal al dispositivo y ha sido respondida",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast.error("No se pudo encontrar el dispositivo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="main-page__main-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="main-page__second-container">
        <CreateDevices
          devices={devices}
          newDevice={createNewDevice}
          changeProgress={changeProgress}
        />
        <ControlTable
          devices={devices}
          changeState={updateDeviceState}
          changeProgress={changeProgress}
          handleSignal={sendSignal}
          handleDelete={handleDelete}
        />
      </div>
      <div className="main-page__progress-bar">
        <h2>Memoria</h2>
        <MemoryBar progress={progress}></MemoryBar>
      </div>
    </div>
  );
};

export default MainPage;
