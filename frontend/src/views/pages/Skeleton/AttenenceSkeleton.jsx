import React from 'react';
import { Skeleton } from '@mui/material';
import { css } from '@emotion/react';

const skeletonContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 50px;
`;

const skeletonStyles = css`
  border-radius: 8px;
`;

const  SkeletonComponent = () => {
  return (
    <div css={skeletonContainerStyles}>
      <Skeleton css={skeletonStyles} variant="rectangular" width="100%" height={50} animation="wave" />
      <Skeleton css={skeletonStyles} variant="rectangular" width="100%" height={50} animation="wave" />
      <Skeleton css={skeletonStyles} variant="rectangular" width="100%" height={50} animation="wave" />
    </div>
  );
};

export default  SkeletonComponent;
