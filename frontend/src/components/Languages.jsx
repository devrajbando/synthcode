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
                <Text>Language:</Text>
            <MenuTrigger asChild>

            <Button>{language}</Button>
            </MenuTrigger>
            <MenuContent bg={"#110c1b"}>
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