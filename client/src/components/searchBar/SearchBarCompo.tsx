import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
type SearchProp={
  customPlaceHolder?:string,
  customClassForSearchBar?:string

}
export default function SearchbarCompo(props: SearchProp) {
  const {customPlaceHolder,customClassForSearchBar}= props
  return (
    <Paper
    className={customClassForSearchBar}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 250,
        height: 35,
        bgcolor: "#fff",
        borderBottom: "white",
        boxShadow: "none",
        marginBottom: "10px",
        border:"1px solid #cccccc"
      }}
    >        <SearchIcon  sx={{
        color:"#cccccc",
        paddingLeft:"2px"
    }}/>

      <InputBase
        sx={{ ml: 1, flex: 1, }}
        placeholder={customPlaceHolder}
        inputProps={{ "aria-label": "search google maps" }}
      />
      
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
      </IconButton>
    </Paper>
  );
}
