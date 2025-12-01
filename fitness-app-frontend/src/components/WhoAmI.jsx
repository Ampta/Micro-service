import { Box, Typography, Chip, Divider, Avatar, Stack } from '@mui/material';
import React from 'react'

const WhoAmI = ({ token, tokenData }) => {
    const formatExpiration = (exp) => {
        if (!exp) return 'N/A';
        // Multiply by 1000 because JS uses milliseconds
        return new Date(exp * 1000).toLocaleString();
    };

    return (
        <Box
            component="section"
            sx={{
                mx: 2,
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                maxWidth: 600,
                backgroundColor: '#f9f6f6ff'
            }}
            
        >
            {/* Header with Avatar and Name */}
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    {tokenData.given_name ? tokenData.given_name[0].toUpperCase() : 'U'}
                </Avatar>
                <Box>
                    <Typography variant="h5" component="div">
                        {tokenData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        @{tokenData.preferred_username}
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Contact Details */}
            <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                    Email
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">
                        {tokenData.email}
                    </Typography>
                    {/* Conditional Badge based on verification */}
                    <Chip
                        label={tokenData.email_verified ? "Verified" : "Unverified"}
                        color={tokenData.email_verified ? "success" : "warning"}
                        size="small"
                        variant="outlined"
                    />
                </Stack>
            </Box>

            {/* Access Roles */}
            <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Roles
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {tokenData.realm_access?.roles.map((role) => (
                        <Chip key={role} label={role} size="small" />
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Session Info */}
            <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                    User ID: {tokenData.sub}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                    Session Expires: {formatExpiration(tokenData.exp)}
                </Typography>
            </Box>

            <Box component="pre">
                <pre>{JSON.stringify(tokenData, null, 2)}</pre>
            </Box>
        </Box>
    )
}

export default WhoAmI