const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
/** @returns {import('next').NextConfig} */
module.exports = (phase) => ({
  images: { unoptimized: true },
  // Keep a running preview independent of production-build artifacts.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
