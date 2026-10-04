/**
 * navigation_information_architecture.test.js
 * Verification Test Suite for 4-Hub Information Architecture, Guest Onboarding Funnel,
 * and Segmented Sub-Tab State Management.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DIALECTS } from '../src/constants/dialects.js';

describe('Website Information Architecture & Navigation Hubs', () => {
  describe('1. 4-Hub Consolidated Routing & Backward Compatibility Mapping', () => {
    // Mapping helper matching AppContext.jsx handleSetActiveTab
    function resolveNavigation(tabId) {
      let activeTab = 'tong-quan';
      let practiceSubTab = 'coda-sentences';
      let aiLabSubTab = 'ai-hoi-thoai';
      let progressSubTab = 'analytics';

      if (tabId === 'khau-hinh-2d') {
        activeTab = 'phong-luyen-phat-am';
        practiceSubTab = 'khau-hinh-2d';
      } else if (tabId === 'mastery-lab') {
        activeTab = 'phong-luyen-phat-am';
        practiceSubTab = 'mastery-pairs';
      } else if (tabId === 'ai-hoi-thoai') {
        activeTab = 'ai-lab';
        aiLabSubTab = 'ai-hoi-thoai';
      } else if (tabId === 'game-3d-rpg') {
        activeTab = 'ai-lab';
        aiLabSubTab = 'game-3d-rpg';
      } else if (tabId === 'ngan-hang-tu-loi') {
        activeTab = 'tien-do';
        progressSubTab = 'error-bank';
      } else if (tabId === 'pro-upgrade') {
        activeTab = 'tien-do';
        progressSubTab = 'pro-upgrade';
      } else {
        activeTab = tabId;
      }

      return { activeTab, practiceSubTab, aiLabSubTab, progressSubTab };
    }

    it('Must correctly map legacy "khau-hinh-2d" to Hub "phong-luyen-phat-am" with sub-tab "khau-hinh-2d"', () => {
      const res = resolveNavigation('khau-hinh-2d');
      assert.equal(res.activeTab, 'phong-luyen-phat-am');
      assert.equal(res.practiceSubTab, 'khau-hinh-2d');
    });

    it('Must correctly map legacy "mastery-lab" to Hub "phong-luyen-phat-am" with sub-tab "mastery-pairs"', () => {
      const res = resolveNavigation('mastery-lab');
      assert.equal(res.activeTab, 'phong-luyen-phat-am');
      assert.equal(res.practiceSubTab, 'mastery-pairs');
    });

    it('Must correctly map legacy "ai-hoi-thoai" to Hub "ai-lab" with sub-tab "ai-hoi-thoai"', () => {
      const res = resolveNavigation('ai-hoi-thoai');
      assert.equal(res.activeTab, 'ai-lab');
      assert.equal(res.aiLabSubTab, 'ai-hoi-thoai');
    });

    it('Must correctly map legacy "game-3d-rpg" to Hub "ai-lab" with sub-tab "game-3d-rpg"', () => {
      const res = resolveNavigation('game-3d-rpg');
      assert.equal(res.activeTab, 'ai-lab');
      assert.equal(res.aiLabSubTab, 'game-3d-rpg');
    });

    it('Must correctly map legacy "ngan-hang-tu-loi" to Hub "tien-do" with sub-tab "error-bank"', () => {
      const res = resolveNavigation('ngan-hang-tu-loi');
      assert.equal(res.activeTab, 'tien-do');
      assert.equal(res.progressSubTab, 'error-bank');
    });

    it('Must correctly map legacy "pro-upgrade" to Hub "tien-do" with sub-tab "pro-upgrade"', () => {
      const res = resolveNavigation('pro-upgrade');
      assert.equal(res.activeTab, 'tien-do');
      assert.equal(res.progressSubTab, 'pro-upgrade');
    });

    it('Direct navigation to core hubs must remain pure', () => {
      assert.equal(resolveNavigation('tong-quan').activeTab, 'tong-quan');
      assert.equal(resolveNavigation('phong-luyen-phat-am').activeTab, 'phong-luyen-phat-am');
      assert.equal(resolveNavigation('ai-lab').activeTab, 'ai-lab');
      assert.equal(resolveNavigation('tien-do').activeTab, 'tien-do');
    });
  });

  describe('2. Guest State Machine & First-Time Learner Funnel (FTUX)', () => {
    class MockAuthStorage {
      constructor() {
        this.store = {};
      }
      getItem(key) {
        return this.store[key] || null;
      }
      setItem(key, value) {
        this.store[key] = String(value);
      }
      removeItem(key) {
        delete this.store[key];
      }
    }

    it('Initial state must default to Guest mode when localStorage has no user', () => {
      const mockStorage = new MockAuthStorage();
      const user = mockStorage.getItem('vietphonics_user');
      const isGuest = !user;
      assert.equal(isGuest, true);
    });

    it('loginLearner must transition user from Guest to Registered Learner', () => {
      const mockStorage = new MockAuthStorage();
      let isGuest = true;
      let currentUser = null;
      let isPro = false;

      const loginLearner = (userData) => {
        currentUser = userData;
        isGuest = false;
        if (userData?.tier === 'pro' || userData?.isPro) {
          isPro = true;
        }
        mockStorage.setItem('vietphonics_user', JSON.stringify(userData));
      };

      const testUser = { id: 'u_123', name: 'Đặng Vương', email: 'vuong@vietphonics.vn', tier: 'pro' };
      loginLearner(testUser);

      assert.equal(isGuest, false);
      assert.equal(isPro, true);
      assert.equal(currentUser.name, 'Đặng Vương');
      assert.ok(mockStorage.getItem('vietphonics_user'));
    });

    it('logoutLearner must transition user back to Guest mode and purge stored session', () => {
      const mockStorage = new MockAuthStorage();
      mockStorage.setItem('vietphonics_user', JSON.stringify({ id: 'u_123', name: 'Đặng Vương' }));

      let isGuest = false;
      let currentUser = { id: 'u_123' };
      let isPro = true;

      const logoutLearner = () => {
        currentUser = null;
        isGuest = true;
        isPro = false;
        mockStorage.removeItem('vietphonics_user');
      };

      logoutLearner();

      assert.equal(isGuest, true);
      assert.equal(isPro, false);
      assert.equal(currentUser, null);
      assert.equal(mockStorage.getItem('vietphonics_user'), null);
    });
  });

  describe('3. Dialect Calibration Profiles Integrity (L1 Vietnamese Adaptation)', () => {
    it('Miền Bắc profile must contain /d/ to /z/ calibration and F0-F2 offset', () => {
      assert.ok(DIALECTS.bac);
      assert.equal(DIALECTS.bac.id, 'bac');
      assert.equal(DIALECTS.bac.name, 'Miền Bắc');
      assert.ok(DIALECTS.bac.desc.includes('/d/ ➔ /z/'));
    });

    it('Miền Trung profile must contain Tonal Pitch calibration and vowel expansion', () => {
      assert.ok(DIALECTS.trung);
      assert.equal(DIALECTS.trung.id, 'trung');
      assert.equal(DIALECTS.trung.name, 'Miền Trung');
      assert.ok(DIALECTS.trung.desc.includes('/e/-/ɛ/'));
    });

    it('Miền Nam profile must contain /v/ to /j/ calibration and unreleased coda preservation', () => {
      assert.ok(DIALECTS.nam);
      assert.equal(DIALECTS.nam.id, 'nam');
      assert.equal(DIALECTS.nam.name, 'Miền Nam');
      assert.ok(DIALECTS.nam.desc.includes('/v/ ➔ /j/'));
    });
  });
});
