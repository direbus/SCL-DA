import { writeOutput } from './utils';
import rawInput from './data/sample.json';

(() => {
  const inputs = rawInput as Record<string, any>[];

  const links: string[][] = new Array(inputs.length);
  const connect: number[][] = new Array(inputs.length);
  const nums = new Array(inputs.length);

  for (let i = 0; i < inputs.length; i++) {
    links[i] = [inputs[i].Id];
    connect[i] = [i];
    nums[i] = 0;
  }

  // order id
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].OrderId === '') {
      continue;
    }

    for (let j = 0; j < inputs.length; j++) {
      if (inputs[j].OrderId === '') {
        continue;
      }

      if (inputs[i].OrderId === inputs[j].OrderId) {
        const newArr: Set<string> = new Set();
        const newConnect: Set<number> = new Set();

        connect[i].forEach(num => newConnect.add(num));
        connect[j].forEach(num => newConnect.add(num));

        links[i].forEach(str => newArr.add(str));
        links[j].forEach(str => newArr.add(str));

        for (const connex of newConnect) {
          connect[connex] = [...newConnect];
          links[connex] = [...newArr];
        }
      }
    }
  }

  // email
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].Email === '') {
      continue;
    }

    for (let j = 0; j < inputs.length; j++) {
      if (inputs[i].Email === '') {
        continue;
      }

      if (inputs[i].Email === inputs[j].Email) {
        const newArr: Set<string> = new Set();
        const newConnect: Set<number> = new Set();

        connect[i].forEach(num => newConnect.add(num));
        connect[j].forEach(num => newConnect.add(num));

        links[i].forEach(str => newArr.add(str));
        links[j].forEach(str => newArr.add(str));

        for (const connex of newConnect) {
          connect[connex] = [...newConnect];
          links[connex] = [...newArr];
        }
      }
    }
  }

  // number
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].Phone === '') {
      continue;
    }

    for (let j = 0; j < inputs.length; j++) {
      if (inputs[i].Phone === '') {
        continue;
      }

      if (inputs[i].Phone === inputs[j].Phone) {
        const newArr: Set<string> = new Set();
        const newConnect: Set<number> = new Set();

        connect[i].forEach(num => newConnect.add(num));
        connect[j].forEach(num => newConnect.add(num));

        links[i].forEach(str => newArr.add(str));
        links[j].forEach(str => newArr.add(str));

        for (const connex of newConnect) {
          connect[connex] = [...newConnect];
          links[connex] = [...newArr];
        }
      }
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    let res = 0;

    connect[i].forEach((id) => {
      res += inputs[id].Contacts;
    });

    nums[i] = res;
  }

  const res = [];

  for (let i = 0; i < inputs.length; i++) {
    const obj: Record<string, string> = {
      'ticket_id': inputs[i].Id,
    };

    const ganteng = connect[i].map(conn => inputs[conn].Id);

    const extraGanteng = ganteng.sort().join('-');

    const superDuperGanteng = `${extraGanteng}, ${nums[i]}`;

    obj['ticket_trace/contact'] = superDuperGanteng;

    res.push(obj);
  }

  writeOutput(res);
})();
