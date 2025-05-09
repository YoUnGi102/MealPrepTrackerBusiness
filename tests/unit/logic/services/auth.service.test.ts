/// <reference types="jest" />

import { createAuthService } from "../../../../src/logic/services/auth.service.factory";
import '../../../setup/setupTestDB'

let authService: ReturnType<typeof createAuthService>;

describe('Auth service', () => {
    it('should create user', () => {
        
    })
})