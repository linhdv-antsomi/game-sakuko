// Libraries
import React from "react";

// Hooks
import { useIconProps } from "./hooks/useIconProps";

// Types
import { IconProps } from "./types";

export const SearchIcon: React.FC<IconProps> = (props) => {
    const iconProps = useIconProps(props);

    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8926 11.0156L17.8613 15.9844L16.3613 17.4844L11.3926 12.5156V11.7188L11.1113 11.4375C9.98633 12.4219 8.48633 12.9844 6.89258 12.9844C3.2832 12.9844 0.376953 10.0781 0.376953 6.51562C0.376953 2.90625 3.2832 0 6.89258 0C10.4551 0 13.3613 2.90625 13.3613 6.51562C13.3613 8.10938 12.7988 9.60938 11.8145 10.7344L12.0957 11.0156H12.8926ZM6.89258 11.0156C9.37695 11.0156 11.3926 9 11.3926 6.51562C11.3926 4.03125 9.37695 2.01562 6.89258 2.01562C4.4082 2.01562 2.39258 4.03125 2.39258 6.51562C2.39258 9 4.4082 11.0156 6.89258 11.0156Z" fill="#595959" />
        </svg>

    );
};
