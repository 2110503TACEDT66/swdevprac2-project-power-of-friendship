import "@testing-library/jest-dom/extend-expect"
import { TextEncoder, TextDecoder } from 'text-encoding';

// Assign the polyfills to global scope
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import 'text-encoding';
process.env.BACKEND_URL = 'http://localhost:5000'