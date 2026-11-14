/** Moteur des marchés : cas tirés de fiches réelles (export DATAtourisme du 12/11/2026, pages officielles lues le 13/11/2026). */
import { describe, expect, it } from 'vitest';
import { ouvertLe, creneaux, etatA, jourSemaine, distanceKm, cherche, ajouteJours, saisonDe, prochainJourZone } from '../src/lib/engine/marches';
import { MARCHES, VILLES, STATS } from '../src/lib/data';
const m = (insee: string, motif: string) => MARCHES.find((x) => x.insee === insee && x.n.includes(motif))!;

describe('calendrier', () => {
  it('jours de la semaine', () => { expect(jourSemaine('2026-11-30')).toBe(0); expect(jourSemaine('2026-12-25')).toBe(4); expect(jourSemaine('2026-11-29')).toBe(6); });
  it('ajout de jours', () => { expect(ajouteJours('2026-12-31', 1)).toBe('2027-01-01'); });
});
describe('Strasbourg (page de la Ville)', () => {
  const s = m('67482', 'Strasbourg');
  it('ouvert du 27/11 au 24/12, fermé le 25', () => { expect(ouvertLe(s, '2026-11-26')).toBe(false); expect(ouvertLe(s, '2026-11-27')).toBe(true); expect(ouvertLe(s, '2026-12-24')).toBe(true); expect(ouvertLe(s, '2026-12-25')).toBe(false); });
  it('horaires et exceptions', () => {
    expect(creneaux(s, '2026-11-27')).toEqual([['14:00', '21:00']]);
    expect(creneaux(s, '2026-12-01')).toEqual([['11:30', '21:00']]);
    expect(creneaux(s, '2026-12-12')).toEqual([['11:30', '22:00']]);
    expect(creneaux(s, '2026-12-24')).toEqual([['11:30', '18:00']]);
  });
  it('état à une heure donnée', () => {
    expect(etatA(s, '2026-12-01', '10:00')).toEqual({ etat: 'plus-tard', ouvre: '11:30' });
    expect(etatA(s, '2026-12-01', '15:00')).toEqual({ etat: 'ouvert', jusqua: '21:00' });
    expect(etatA(s, '2026-12-01', '21:30')).toEqual({ etat: 'termine' });
    expect(etatA(s, '2026-12-25', '15:00')).toEqual({ etat: 'ferme' });
  });
});
describe('Lille (page de la Ville)', () => {
  const l = m('59350', 'Lille');
  it('22 h le vendredi, 20 h 30 le dimanche, fermé le 25', () => {
    expect(creneaux(l, '2026-12-04')).toEqual([['11:00', '22:00']]);
    expect(creneaux(l, '2026-12-06')).toEqual([['11:00', '20:30']]);
    expect(creneaux(l, '2026-12-24')).toEqual([['11:00', '18:00']]);
    expect(ouvertLe(l, '2026-12-25')).toBe(false);
    expect(ouvertLe(l, '2026-12-30')).toBe(true);
  });
});
describe('fiches DATAtourisme', () => {
  it('Colmar, Petite Venise : semaine 11 h-19 h, week-end 10 h-20 h', () => {
    const c = m('68066', 'Petite Venise');
    expect(creneaux(c, '2026-12-02')).toEqual([['11:00', '19:00']]);
    expect(creneaux(c, '2026-12-05')).toEqual([['10:00', '20:00']]);
  });
  it('Colmar, marché gourmand ouvert le 2 janvier 2027', () => { expect(ouvertLe(m('68066', 'Gourmand'), '2027-01-02')).toBe(true); });
  it('Reims : ouvert, horaires non publiés', () => { const r = m('51454', 'Reims'); expect(ouvertLe(r, '2026-12-10')).toBe(true); expect(creneaux(r, '2026-12-10')).toEqual([]); expect(etatA(r, '2026-12-10', '12:00')).toEqual({ etat: 'inconnu' }); });
  it('Kaysersberg : fermé un mardi de l\'Avent', () => { const k = m('68162', 'artisanal'); expect(ouvertLe(k, '2026-12-01')).toBe(false); expect(ouvertLe(k, '2026-12-05')).toBe(true); });
  it('aucun concert ni exposition compté comme marché', () => { expect(MARCHES.some((x) => /^\W*(concert|exposition|feu d)/i.test(x.n))).toBe(false); });
  it('comptes cohérents', () => { expect(STATS.marches).toBe(MARCHES.length); expect(MARCHES.length).toBeGreaterThan(2000); });
});
describe('distance et recherche', () => {
  const sxb = VILLES.find((v) => v.n === 'Strasbourg')!, cmr = VILLES.find((v) => v.n === 'Colmar')!;
  it('Strasbourg-Colmar à vol d\'oiseau entre 55 et 60 km', () => { const d = distanceKm(sxb, cmr); expect(d).toBeGreaterThan(55); expect(d).toBeLessThan(60); });
  it('recherche triée par distance, rayon respecté', () => {
    const r = cherche(MARCHES, cmr, 20, '2026-12-05');
    expect(r.length).toBeGreaterThan(10);
    expect(r.every((x) => x.km <= 20)).toBe(true);
    for (let i = 1; i < r.length; i++) expect(r[i].km).toBeGreaterThanOrEqual(r[i - 1].km);
  });
  it('filtre du soir : ferme à 20 h ou plus tard', () => {
    for (const x of cherche(MARCHES, cmr, 30, '2026-12-05', 'soir')) expect(x.c.some(([, b]) => b >= '20:00' || b === '00:00')).toBe(true);
  });
});
describe('avant l\'ouverture, entre deux jours, après la fermeture (testeurs naïfs du 2026-11-14)', () => {
  const J = (() => { const o: string[] = []; for (let d = '2026-11-13'; d <= '2027-01-10'; d = ajouteJours(d, 1)) o.push(d); return o; })();
  it('Amiens le 14 novembre : pas encore ouvert, ouvre le vendredi 20 novembre', () => { expect(saisonDe([m('80021', 'Amiens')], '2026-11-14', J)).toEqual({ etat: 'avant', le: '2026-11-20' }); });
  it('Lille le 14 novembre : ouvre le 18 novembre', () => { expect(saisonDe([m('59350', 'Lille')], '2026-11-14', J)).toEqual({ etat: 'avant', le: '2026-11-18' }); });
  it('Kaysersberg un mardi de l\'Avent : fermé, rouvre le vendredi 4 décembre', () => {
    const k = MARCHES.filter((x) => x.insee === '68162');
    expect(saisonDe(k, '2026-12-01', J)).toEqual({ etat: 'ferme', le: '2026-12-04' });
  });
  it('Strasbourg le 26 décembre : fini, dernier jour le 24 décembre', () => { expect(saisonDe([m('67482', 'Strasbourg')], '2026-12-26', J)).toEqual({ etat: 'fini', le: '2026-12-24' }); });
  it('le jour d\'ouverture : ouvert', () => { expect(saisonDe([m('80021', 'Amiens')], '2026-11-20', J)).toEqual({ etat: 'ouvert' }); });
  it('zone sans marché ce jour-là : le prochain jour donne au moins un résultat', () => {
    const ams = VILLES.find((v) => v.n === 'Amiens')!;
    const s = prochainJourZone(MARCHES, ams, 30, '2026-11-14', J);
    if (s.etat === 'avant' || s.etat === 'ferme') { expect(s.le > '2026-11-14').toBe(true); expect(cherche(MARCHES, ams, 30, s.le).length).toBeGreaterThan(0); }
    else expect(s.etat).toBe('ouvert');
  });
});
