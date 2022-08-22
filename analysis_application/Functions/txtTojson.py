import json

def line_to_dict(split_Line):
    # Assumes that the first ':' in a line
    # is always the key:value separator

    line_dict = {}
    for part in split_Line:
        key, value = part.split(":", maxsplit=1)
        line_dict[key] = value

    return line_dict

def convert() :
    f = open("../coord/player_coord.txt", "r")
    content = f.read()
    splitcontent = content.splitlines()

    # Split each line by pipe
    lines = [line.split(' | ') for line in splitcontent]

    # Convert each line to dict
    lines = [line_to_dict(l) for l in lines]

    # Output JSON
    with open("json_log.json", 'w') as fout:
        json.dump(lines, fout, indent=4)