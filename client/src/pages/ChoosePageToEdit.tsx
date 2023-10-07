import styles from "./css/ChoosePageToEdit.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkComponent from "./pages_components/LinkComponent";

type SetNameObject = {
  Tables_in_flashcards: string;
};

type SetsDto = {
  Tables_in_flashcards: string
}[]

export default function ChoosePageToEdit() {
  const [setsName, setSetsName] = useState<SetsDto>([]);

  useEffect(() => {
    axios
      .get<SetsDto>("http://localhost:5174/getsets")
      .then((res) => {
        setSetsName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.pageToEditText}>Choose page to edit </h1>
      <ul>
        {setsName.map((setNameObject) => (
          <LinkComponent
            setName={setNameObject.Tables_in_flashcards}
            key={setNameObject}
            subpageName='editsetform'
          />
        ))}
      </ul>
    </div>
  );
}
