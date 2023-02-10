import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component";
import directoryStore from "../../store/directoryStore";
import { observer } from "mobx-react";

const Directory = observer(() => {
  return (
    <div className="directory-container">
      {directoryStore.categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
});

export default Directory;
