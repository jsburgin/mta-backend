const bodyParser = {
  json: jest.fn(),
  urlencoded: jest.fn(),
};

bodyParser.json.mockReturnValue('mock-json');
bodyParser.urlencoded.mockReturnValue('mock-urlencoded');

export default bodyParser;