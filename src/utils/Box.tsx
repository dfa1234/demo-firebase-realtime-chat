import React from 'react';
import styled from 'styled-components';
import {
    border,
    BorderProps,
    color,
    ColorProps,
    compose,
    flexbox,
    FlexboxProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
    space,
    SpaceProps,
    typography,
    TypographyProps
} from 'styled-system';

type StyledSystemProps =
    SpaceProps
    & LayoutProps
    & FlexboxProps
    & BorderProps
    & ColorProps
    & PositionProps
    & TypographyProps

type BoxProps = { onPress?: (event?: any) => void } & StyledSystemProps


const StyledSystemBox = styled.div(
    compose(
        space,
        flexbox,
        layout,
        border,
        color,
        position,
        typography
    )
);

export const Box = React.forwardRef<HTMLDivElement, React.PropsWithChildren<BoxProps>>(({children, onPress, ...rest}, ref) => {
    return (
        // @ts-ignore
        <StyledSystemBox onClick={onPress} {...rest} ref={ref}>
            {children}
        </StyledSystemBox>
    );
});
