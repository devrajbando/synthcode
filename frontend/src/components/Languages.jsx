import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,Text,Box,Button,
  } from "@chakra-ui/react"

import Langss from './codesnippet.js';
 const Language=({language,onSelect})=>{

    
    const Lang=Object.entries(Langss.Langs)

    return(
        <>
        <Box>
            
            <MenuRoot isLazy>
                <h1 className="text-xl font-bold m-2">Language</h1>
            <MenuTrigger asChild>
            

            <button className="rounded bg-indigo-950 m-2 p-2 flex pl-4">{language}     
                <svg width="30px" className="ml-2" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            </MenuTrigger>
            <MenuContent bg={"#110c1b"} className="z-8 fixed">
                {
                    Lang.map(([lang,version])=>(
                        <MenuItem key={lang}
                        onClick={()=>{onSelect(lang)}}
                        color={
                            lang === language? "blue.400" : ""
                        }
                        bg={
                            lang === language? "gray.900" : "transparent"
                        }
                        _hover={{
                            color: "blue.400",
                            bg: "gray.900",
                          }}
                        >{lang}</MenuItem>
                    ))
                }
            </MenuContent>
            </MenuRoot>
        </Box>
        </>
    )
}

export default Language