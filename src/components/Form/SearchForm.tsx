import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { MdHighlightOff } from "react-icons/md";

function SearchForm(props: any) {
    const { handleOnChange, searchTerm, handleKeyDown, showClearIcon, clearSearchTerm } = props;

    return (
        <InputGroup width='auto'>
            <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='0.9em'
                children={<SearchIcon color='gray.500' />}
            />
            <Input onChange={handleOnChange} value={searchTerm} onKeyDown={handleKeyDown}
                placeholder='Search'
                variant='filled'
                size='md'
            />

            {showClearIcon &&
                <InputRightElement
                    onClick={() => clearSearchTerm()}
                    children={<MdHighlightOff color='gray.500' />}
                />}
        </InputGroup>
    );
}

export default SearchForm;
